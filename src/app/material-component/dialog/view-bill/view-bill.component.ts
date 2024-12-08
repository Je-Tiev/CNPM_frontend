import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { NgxUiLoaderService } from 'ngx-ui-loader';
import { BillService } from 'src/app/services/bill.service';
import { SnackbarService } from 'src/app/services/snackbar.service';
import { GlobalConstants } from 'src/app/shared/global-constans';
import { ConfirmationComponent } from '../confirmation/confirmation.component';
import { saveAs } from 'file-saver';
import { ViewBillProductsComponent } from '../view-bill-products/view-bill-products.component';
import { ShopService } from 'src/app/services/shop.service';

@Component({
  selector: 'app-view-bill',
  templateUrl: './view-bill.component.html',
  styleUrls: ['./view-bill.component.scss']
})
export class ViewBillComponent implements OnInit {

  displayedColumns: string[] = ['name', 'paymentMethod', 'total', 'view'];
  dataSource: any;
  total: any;
  responseMessage: any;
  shopId: any;

  constructor(@Inject(MAT_DIALOG_DATA) public dialogData: any,
    private shopService: ShopService,
    private billService: BillService,
    private ngxService: NgxUiLoaderService,
    private dialog: MatDialog,
    private snackbarService: SnackbarService,
    private router: Router) { }

  ngOnInit(): void {
    this.ngxService.start();
    this.shopId = this.dialogData.data;
    this.tableData();
  }

  tableData() {
    this.shopService.getShopBills(this.shopId).subscribe((response: any) => {
      this.ngxService.stop();
      this.total = response.total;
      this.dataSource = new MatTableDataSource(response.bills);
    }, (error: any) => {
      this.ngxService.stop();
      console.log(error);
      if (error.error?.message) {
        this.responseMessage = error.error?.message;
      }
      else {
        this.responseMessage = GlobalConstants.genericError;
      }
      this.snackbarService.openSnackBar(this.responseMessage, GlobalConstants.error);
    })
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  handleViewAction(values: any) {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.data = {
      data: values
    }
    dialogConfig.width = "100%";
    const dialogRef = this.dialog.open(ViewBillProductsComponent, dialogConfig);
    this.router.events.subscribe(() => {
      dialogRef.close();
    })
  }

  handleDeleteAction(values: any) {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.data = {
      message: 'delete ' + values.name + ' bill',
      confirmation: true
    };
    const dialogRef = this.dialog.open(ConfirmationComponent, dialogConfig);
    const sub = dialogRef.componentInstance.onEmitStatusChange.subscribe((response) => {
      this.ngxService.start();
      this.deleteBill(values.id);
      dialogRef.close();
    })
  }

  deleteBill(id: any) {
    this.billService.delete(id).subscribe((response: any) => {
      this.ngxService.stop();
      this.tableData();
      this.responseMessage = response?.message;
      this.snackbarService.openSnackBar(this.responseMessage, GlobalConstants.error);
    }, (error) => {
      this.ngxService.stop();
      console.log(error);
      if (error.error?.message) {
        this.responseMessage = error.error?.message;
      }
      else {
        this.responseMessage = GlobalConstants.genericError;
      }
      this.snackbarService.openSnackBar(this.responseMessage, GlobalConstants.error);
    });
  }

  downloadReportAction(values: any) {
    this.ngxService.start();
    var data = {
      name: values.name,
      uuid: values.uuid,
      paymentMethod: values.paymentMethod,
      totalAmount: values.total.toString(),
    }
    this.downloadFile(values.uuid, data);
  }

  downloadFile(fileName: string, data: any) {
    this.billService.getPdf(data).subscribe((response) => {
      saveAs(response, fileName + '.pdf');
      this.ngxService.stop();
    });
  }
}

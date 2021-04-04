import { Component } from '@angular/core';
import { ToastController } from '@ionic/angular';
import { AlertController } from '@ionic/angular';
import { GroceriesService } from '../groceries.service';


@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss']
})
export class Tab1Page {
  title = "Grocery";

  
  constructor(public toastController: ToastController,
              public alertController: AlertController,
              public dataService: GroceriesService) {


  }

  loadItems() {
    return this.dataService.getItems();
  }

  async removeItem(item, index) {
    console.log("Removing Item... ", item, index);
    const toast = await this.toastController.create({
      // position: 'top',
      message: 'Removing Item - ' + index + '...',
      duration: 3000
    });
    toast.present();

    this.dataService.removeItem(index);
  }

  async editItem(item, index) {
    console.log("Edit Item... ", item, index);
    const toast = await this.toastController.create({
      // position: 'top',
      message: 'Editing Item - ' + index + '...',
      duration: 3000
    });
    toast.present();

    this.showEditItemPrompt(item, index)
  }

  addItem() {
    console.log("Addding Item...");
    this.showAddItemPrompt();
  }

  async showAddItemPrompt() {
    const alert = await this.alertController.create({
      cssClass: 'my-custom-class',
      header: 'Add Item',
      message: "Please enter item...",
      inputs: [
        {
          name: 'name',
          type: 'text',
          placeholder: 'Item Name'
        },
        {
          name: 'quantity',
          type: 'number',
          placeholder: '1'
        }
      ],
      buttons: [
        {
          text: 'Cancel',
          role: 'cancel',
          cssClass: 'primary',
          handler: () => {
            console.log('Confirm Cancel');
          }
        }, {
          text: 'Save',
          handler: (item) => {
            console.log('Confirm Ok', item);
            this.dataService.addItem(item);
          }
        }
      ]
    });

    await alert.present();
  }

  async showEditItemPrompt(item, index) {
    const alert = await this.alertController.create({
      cssClass: 'my-custom-class',
      header: 'Edit Item',
      message: "Please edit item...",
      inputs: [
        {
          name: 'name',
          type: 'text',
          value: item.name
        },
        {
          name: 'quantity',
          type: 'number',
          value: item.quantity
        }
      ],
      buttons: [
        {
          text: 'Cancel',
          role: 'cancel',
          cssClass: 'primary',
          handler: () => {
            console.log('Confirm Cancel');
          }
        }, {
          text: 'Save',
          handler: (item) => {
            console.log('Confirm Ok', item);
            this.dataService.editItem(item, index);
          }
        }
      ]
    });

    await alert.present();
  }

}

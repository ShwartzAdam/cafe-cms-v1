import { Component, OnInit } from '@angular/core';
import { ItemService } from '../../services/item.service';
import { Item } from '../../interface/item';
import {Supplier} from '../../interface/supplier';

@Component({
  selector: 'app-item-modal-add',
  templateUrl: './item-add.component.html',
  styleUrls: ['./item-add.component.css'],
  providers: [ItemService]
})
export class ItemAddComponent implements OnInit {
  public item: Item = new Item;
  public suppliers: Supplier[] = new Array();

  constructor(private itemService: ItemService) {}
  ngOnInit() {

  }

  action(event): void {
    if ( event === 'Upload') {
      console.log('UPLOAD Item');
      console.log(this.item);
      this.itemService.createItem(this.item).then(
        res => {
          console.log(res);
        });

    } else {
      console.log('Cancel and exit add Item mod');

    }
  }
}
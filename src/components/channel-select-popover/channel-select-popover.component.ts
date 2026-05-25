import { Component } from '@angular/core';
import { ViewController, NavParams, Events } from 'ionic-angular';

@Component({
    standalone: false,
  selector: 'channel-select-popover',
  templateUrl: 'channel-select-popover.html'
})
export class ChannelSelectPopover {
  public selectedChannels: boolean[];
  public colorArray: string[];

  constructor(
    public viewCtrl: ViewController,
    public params: NavParams,
    public events: Events
  ) {
    this.selectedChannels = this.params.get('selectedChannels');
    this.colorArray = this.params.get('colorArray');
  }

  close() {
    this.viewCtrl.dismiss();
  }

  toggleChannel(index: number) {
    this.selectedChannels[index] = !this.selectedChannels[index];
    this.events.publish('channels:selected', { channels: this.selectedChannels });
  }
}

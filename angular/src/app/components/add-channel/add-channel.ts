import { Component, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ChannelService } from 'services';
import { Channel } from 'models';

/**
 * Ajoute un nouveau channel
 */
@Component({
    selector: 'add-channel',
    templateUrl: 'add-channel.html'
})
export class AddChannelComponent {
    @ViewChild(NgForm)
    ngForm: NgForm;
    isVisible: boolean = false;
    listChannel = [];


    model = { name: '' };
    constructor(
        private channelService: ChannelService
    ) {
    }
    ngOnInit(): void {
        //Called after the constructor, initializing input properties, and the first call to ngOnChanges.
        //Add 'implements OnInit' to the class.
        this.channelService.getAll()
            .then((getAllvalue)=>{
                this.listChannel = getAllvalue;
            })
    }

    show() {
        this.isVisible = true;
    }

    hide() {
        this.isVisible = false;
        this.model.name = '';
    }

    async save() {
        if (this.ngForm.valid) {

            // TODO ajouter le nouveau channel
            this.channelService.add(this.model.name)
            .then((addValue)=>
            {
                console.log('add: ', addValue);
                this.channelService.getAll()
                    .then((getAllvalue)=>{
                        console.log('getAll: ', getAllvalue);
                        this.listChannel = getAllvalue;
                        this.show();
                    })
            });
        }
    }
}
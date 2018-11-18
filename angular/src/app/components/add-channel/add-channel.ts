import { Component, ViewChild, Output, EventEmitter } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ChannelService } from 'services';


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
    @Output() newChannelEvent = new EventEmitter<any>();

    isVisible: boolean = false;
    model = { name: '' };
    constructor(
        private channelService: ChannelService
    ) {
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
                .then((value)=>
                {
                    this.newChannelEvent.emit();
                }, reason => {
                    console.error( reason );
                });
        }
        this.hide();
    }
}
import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DialogCreateWorkspaceComponent } from './dialog-create-workspace.component';
import { HttpClientModule } from '@angular/common/http';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { MaterialModule } from '../../../material/material.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

describe('DialogCreateWorkspaceComponent', () => {
	let component: DialogCreateWorkspaceComponent;
	let fixture: ComponentFixture<DialogCreateWorkspaceComponent>;

	beforeEach(() => {
		TestBed.configureTestingModule({
			imports: [
				HttpClientModule,
				MaterialModule,
				BrowserAnimationsModule
			],
			declarations: [DialogCreateWorkspaceComponent],
			providers: [
				{
					provide: MAT_DIALOG_DATA,
					useValue: {}
				},
				{
					provide: MatDialogRef,
					useValue: {}
				},
			]
		});
		fixture = TestBed.createComponent(DialogCreateWorkspaceComponent);
		component = fixture.componentInstance;
		fixture.detectChanges();
	});

	it('should create', () => {
		expect(component).toBeTruthy();
	});
});

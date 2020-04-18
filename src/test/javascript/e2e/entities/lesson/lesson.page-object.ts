import { element, by, ElementFinder } from 'protractor';

export class LessonComponentsPage {
  createButton = element(by.id('jh-create-entity'));
  deleteButtons = element.all(by.css('jhi-lesson div table .btn-danger'));
  title = element.all(by.css('jhi-lesson div h2#page-heading span')).first();
  noResult = element(by.id('no-result'));
  entities = element(by.id('entities'));

  async clickOnCreateButton(): Promise<void> {
    await this.createButton.click();
  }

  async clickOnLastDeleteButton(): Promise<void> {
    await this.deleteButtons.last().click();
  }

  async countDeleteButtons(): Promise<number> {
    return this.deleteButtons.count();
  }

  async getTitle(): Promise<string> {
    return this.title.getText();
  }
}

export class LessonUpdatePage {
  pageTitle = element(by.id('jhi-lesson-heading'));
  saveButton = element(by.id('save-entity'));
  cancelButton = element(by.id('cancel-save'));

  nameInput = element(by.id('field_name'));
  lessonTimeInput = element(by.id('field_lessonTime'));
  lessonTypeInput = element(by.id('field_lessonType'));
  notesInput = element(by.id('field_notes'));
  approvedInput = element(by.id('field_approved'));

  lessonToUserSelect = element(by.id('field_lessonToUser'));

  async getPageTitle(): Promise<string> {
    return this.pageTitle.getText();
  }

  async setNameInput(name: string): Promise<void> {
    await this.nameInput.sendKeys(name);
  }

  async getNameInput(): Promise<string> {
    return await this.nameInput.getAttribute('value');
  }

  async setLessonTimeInput(lessonTime: string): Promise<void> {
    await this.lessonTimeInput.sendKeys(lessonTime);
  }

  async getLessonTimeInput(): Promise<string> {
    return await this.lessonTimeInput.getAttribute('value');
  }

  async setLessonTypeInput(lessonType: string): Promise<void> {
    await this.lessonTypeInput.sendKeys(lessonType);
  }

  async getLessonTypeInput(): Promise<string> {
    return await this.lessonTypeInput.getAttribute('value');
  }

  async setNotesInput(notes: string): Promise<void> {
    await this.notesInput.sendKeys(notes);
  }

  async getNotesInput(): Promise<string> {
    return await this.notesInput.getAttribute('value');
  }

  getApprovedInput(): ElementFinder {
    return this.approvedInput;
  }

  async lessonToUserSelectLastOption(): Promise<void> {
    await this.lessonToUserSelect
      .all(by.tagName('option'))
      .last()
      .click();
  }

  async lessonToUserSelectOption(option: string): Promise<void> {
    await this.lessonToUserSelect.sendKeys(option);
  }

  getLessonToUserSelect(): ElementFinder {
    return this.lessonToUserSelect;
  }

  async getLessonToUserSelectedOption(): Promise<string> {
    return await this.lessonToUserSelect.element(by.css('option:checked')).getText();
  }

  async save(): Promise<void> {
    await this.saveButton.click();
  }

  async cancel(): Promise<void> {
    await this.cancelButton.click();
  }

  getSaveButton(): ElementFinder {
    return this.saveButton;
  }
}

export class LessonDeleteDialog {
  private dialogTitle = element(by.id('jhi-delete-lesson-heading'));
  private confirmButton = element(by.id('jhi-confirm-delete-lesson'));

  async getDialogTitle(): Promise<string> {
    return this.dialogTitle.getText();
  }

  async clickOnConfirmButton(): Promise<void> {
    await this.confirmButton.click();
  }
}

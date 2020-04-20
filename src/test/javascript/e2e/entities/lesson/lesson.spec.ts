import { browser, ExpectedConditions as ec /* , protractor, promise */ } from 'protractor';
import { NavBarPage, SignInPage } from '../../page-objects/jhi-page-objects';

import {
  LessonComponentsPage,
  /* LessonDeleteDialog, */
  LessonUpdatePage
} from './lesson.page-object';

const expect = chai.expect;

describe('Lesson e2e test', () => {
  let navBarPage: NavBarPage;
  let signInPage: SignInPage;
  let lessonComponentsPage: LessonComponentsPage;
  let lessonUpdatePage: LessonUpdatePage;
  /* let lessonDeleteDialog: LessonDeleteDialog; */

  before(async () => {
    await browser.get('/');
    navBarPage = new NavBarPage();
    signInPage = await navBarPage.getSignInPage();
    await signInPage.autoSignInUsing('admin', 'admin');
    await browser.wait(ec.visibilityOf(navBarPage.entityMenu), 5000);
  });

  it('should load Lessons', async () => {
    await navBarPage.goToEntity('lesson');
    lessonComponentsPage = new LessonComponentsPage();
    await browser.wait(ec.visibilityOf(lessonComponentsPage.title), 5000);
    expect(await lessonComponentsPage.getTitle()).to.eq('Lessons');
    await browser.wait(ec.or(ec.visibilityOf(lessonComponentsPage.entities), ec.visibilityOf(lessonComponentsPage.noResult)), 1000);
  });

  it('should load create Lesson page', async () => {
    await lessonComponentsPage.clickOnCreateButton();
    lessonUpdatePage = new LessonUpdatePage();
    expect(await lessonUpdatePage.getPageTitle()).to.eq('Create or edit a Lesson');
    await lessonUpdatePage.cancel();
  });

  /* it('should create and save Lessons', async () => {
        const nbButtonsBeforeCreate = await lessonComponentsPage.countDeleteButtons();

        await lessonComponentsPage.clickOnCreateButton();

        await promise.all([
            lessonUpdatePage.setNameInput('name'),
            lessonUpdatePage.setLessonTimeInput('01/01/2001' + protractor.Key.TAB + '02:30AM'),
            lessonUpdatePage.setLessonTypeInput('lessonType'),
            lessonUpdatePage.setNotesInput('notes'),
            lessonUpdatePage.lessonToUserSelectLastOption(),
        ]);

        expect(await lessonUpdatePage.getNameInput()).to.eq('name', 'Expected Name value to be equals to name');
        expect(await lessonUpdatePage.getLessonTimeInput()).to.contain('2001-01-01T02:30', 'Expected lessonTime value to be equals to 2000-12-31');
        expect(await lessonUpdatePage.getLessonTypeInput()).to.eq('lessonType', 'Expected LessonType value to be equals to lessonType');
        expect(await lessonUpdatePage.getNotesInput()).to.eq('notes', 'Expected Notes value to be equals to notes');
        const selectedApproved = lessonUpdatePage.getApprovedInput();
        if (await selectedApproved.isSelected()) {
            await lessonUpdatePage.getApprovedInput().click();
            expect(await lessonUpdatePage.getApprovedInput().isSelected(), 'Expected approved not to be selected').to.be.false;
        } else {
            await lessonUpdatePage.getApprovedInput().click();
            expect(await lessonUpdatePage.getApprovedInput().isSelected(), 'Expected approved to be selected').to.be.true;
        }

        await lessonUpdatePage.save();
        expect(await lessonUpdatePage.getSaveButton().isPresent(), 'Expected save button disappear').to.be.false;

        expect(await lessonComponentsPage.countDeleteButtons()).to.eq(nbButtonsBeforeCreate + 1, 'Expected one more entry in the table');
    }); */

  /* it('should delete last Lesson', async () => {
        const nbButtonsBeforeDelete = await lessonComponentsPage.countDeleteButtons();
        await lessonComponentsPage.clickOnLastDeleteButton();

        lessonDeleteDialog = new LessonDeleteDialog();
        expect(await lessonDeleteDialog.getDialogTitle())
            .to.eq('Are you sure you want to delete this Lesson?');
        await lessonDeleteDialog.clickOnConfirmButton();

        expect(await lessonComponentsPage.countDeleteButtons()).to.eq(nbButtonsBeforeDelete - 1);
    }); */

  after(async () => {
    await navBarPage.autoSignOut();
  });
});

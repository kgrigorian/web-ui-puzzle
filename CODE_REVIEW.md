## CODE REVIEW

During code-review following issues and code-smells have been spotted:

- Test coverage is lacking and tests should be descriptive and correct

  - instead of
    it('should work', done => {
    I would suggest something like
    it('should search for specific book', done => {
  - BookEffects have searchBooks effect, but test is written for loadBooks\$
  - ReadingListEffects are not covered with sufficient amounts of tests

- It would be good to apply the single responsibility principle (SRP) to all components, services, and other symbols. This helps make the app cleaner, easier to read and maintain, and more testable.
  For example, move interface declarations to separate files.

- Unnecessary interface implementation.
  eg TotalCountComponent implements OnInit with empty ngOnInit function body (fixed)

- Lacking and inconsistent type definitions (fixed)
  Lacking return type and argument types in some places like:
  removeFromReadingList(item) {
  this.store.dispatch(removeFromReadingList({ item }));
  }

- BookSearchComponent has a subscription to an observable, but does not unsubscribe to free resources. Ideally, not to subscribe at all and let async pipe deal with subscription. (fixed)

- BookSearchComponent's search could be done without FormGroup usage as it is overhead (no validation requirements) in given case. NgModule would also do.

- It could be useful to split BookSearchComponent into smaller components dedicated to isolated problems. Search could be a "dummy" component with only input attributes and output events.

## ACCESSIBILITY

### Lighthouse report issues

- Buttons do not have an accessible name.
  When a button doesn't have an accessible name, screen readers announce it as "button", making it unusable for users who rely on screen readers.
  Failing Elements:
  button.mat-focus-indicator.mat-icon-button.mat-button-base
- Background and foreground colors do not have a sufficient contrast ratio.
  Failing Elements:
  span.mat-button-wrapper
  p

### Other issues

- Image alternative text is not present.
  Each image must have an alt attribute. Without alternative text, the content of an image will not be available to screen reader users or when the image is unavailable.

- Search input does not have corresponding WAI-ARIA role

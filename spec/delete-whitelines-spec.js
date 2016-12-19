'use babel';

import DeleteWhitelines from '../lib/delete-whitelines';

// Use the command `window:run-package-specs` (cmd-alt-ctrl-p) to run specs.
//
// To run a specific `it` or `describe` block add an `f` to the front (e.g. `fit`
// or `fdescribe`). Remove the `f` to unfocus the block.

describe('DeleteWhitelines', () => {
  let workspaceElement, activationPromise;

  beforeEach(() => {
    workspaceElement = atom.views.getView(atom.workspace);
    activationPromise = atom.packages.activatePackage('delete-whitelines');
  });

  describe('when the delete-whitelines:toggle event is triggered', () => {
    it('hides and shows the modal panel', () => {
      // Before the activation event the view is not on the DOM, and no panel
      // has been created
      expect(workspaceElement.querySelector('.delete-whitelines')).not.toExist();

      // This is an activation event, triggering it will cause the package to be
      // activated.
      atom.commands.dispatch(workspaceElement, 'delete-whitelines:toggle');

      waitsForPromise(() => {
        return activationPromise;
      });

      runs(() => {
        expect(workspaceElement.querySelector('.delete-whitelines')).toExist();

        let deleteWhitelinesElement = workspaceElement.querySelector('.delete-whitelines');
        expect(deleteWhitelinesElement).toExist();

        let deleteWhitelinesPanel = atom.workspace.panelForItem(deleteWhitelinesElement);
        expect(deleteWhitelinesPanel.isVisible()).toBe(true);
        atom.commands.dispatch(workspaceElement, 'delete-whitelines:toggle');
        expect(deleteWhitelinesPanel.isVisible()).toBe(false);
      });
    });

    it('hides and shows the view', () => {
      // This test shows you an integration test testing at the view level.

      // Attaching the workspaceElement to the DOM is required to allow the
      // `toBeVisible()` matchers to work. Anything testing visibility or focus
      // requires that the workspaceElement is on the DOM. Tests that attach the
      // workspaceElement to the DOM are generally slower than those off DOM.
      jasmine.attachToDOM(workspaceElement);

      expect(workspaceElement.querySelector('.delete-whitelines')).not.toExist();

      // This is an activation event, triggering it causes the package to be
      // activated.
      atom.commands.dispatch(workspaceElement, 'delete-whitelines:toggle');

      waitsForPromise(() => {
        return activationPromise;
      });

      runs(() => {
        // Now we can test for view visibility
        let deleteWhitelinesElement = workspaceElement.querySelector('.delete-whitelines');
        expect(deleteWhitelinesElement).toBeVisible();
        atom.commands.dispatch(workspaceElement, 'delete-whitelines:toggle');
        expect(deleteWhitelinesElement).not.toBeVisible();
      });
    });
  });
});

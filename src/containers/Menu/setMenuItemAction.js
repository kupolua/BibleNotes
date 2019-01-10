export const MENU_ITEM = 'MENU_ITEM';

export function setMenuItemAction (menuItemName) {
  return {
        type: MENU_ITEM,
        payload: menuItemName
  };
}

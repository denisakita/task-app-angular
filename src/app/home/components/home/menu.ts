export class MenuItem {
  constructor(public order: number = 0, public name: string = '', public path: string = '/', public icon: string = '',
              public active: boolean = true, public canLoadPermission: string = '', public children: MenuItem[] = []) {
  }
}

export const MENU = [
  new MenuItem(1, 'Home', '/', 'workspaces', true, '',),
  new MenuItem(2, 'ToDo', '/todo-list', 'checklist', true, ''),


];

export class MenuItem {
  private readonly itemId: number;
  private readonly text: string;

  public getId() {
    return this.itemId;
  }

  public getText() {
    return this.text;
  }


  constructor(id: number, text: string) {
    this.itemId = id;
    this.text = text;
  }
}

export class MenuItems {
  public mainItems: Array<MenuItem> = [
    new MenuItem(11, 'Главная'),
    new MenuItem(12, 'Администраторы'),
    new MenuItem(13, 'Группы пользователей'),
    new MenuItem(14, 'Сценарии'),
  ];

  public adminItems: Array<MenuItem> = [
    new MenuItem(21, 'Главная'),
    new MenuItem(22, 'Администраторы'),
    new MenuItem(23, 'Группы пользователей'),
    new MenuItem(24, 'Интеграторы'),
    new MenuItem(25, 'Сценарии'),
  ];

  public integratorItems: Array<MenuItem> = [
    new MenuItem(31, 'Главная'),
    new MenuItem(32, 'Интеграторы'),
    new MenuItem(33, 'Группы пользователей'),
    new MenuItem(34, 'Пользователи'),
    new MenuItem(35, 'Сценарии'),
    // new MenuItem(36, 'Контроллеры'),
    // new MenuItem(36, 'Умные вещи'),
    // new MenuItem(36, 'Датчики'),
  ];

  public userItems: Array<MenuItem> = [
    new MenuItem(41, 'Главная'),
    new MenuItem(42, 'Сценарии'),
  ];
}

(function(){
  // Константы
  const apiUrl = 'http://127.0.0.1:3000/api';
  const icons = {
    addClient: '<svg width="23" height="16" viewBox="0 0 23 16" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M14.5 8C16.71 8 18.5 6.21 18.5 4C18.5 1.79 16.71 0 14.5 0C12.29 0 10.5 1.79 10.5 4C10.5 6.21 12.29 8 14.5 8ZM5.5 6V3H3.5V6H0.5V8H3.5V11H5.5V8H8.5V6H5.5ZM14.5 10C11.83 10 6.5 11.34 6.5 14V16H22.5V14C22.5 11.34 17.17 10 14.5 10Z" fill="#9873FF"/></svg>',
    close: '<svg width="17" height="17" viewBox="0 0 17 17" fill="none" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" clip-rule="evenodd" d="M16.2333 1.73333L15.2666 0.766664L8.49991 7.53336L1.73324 0.766696L0.766576 1.73336L7.53324 8.50003L0.766603 15.2667L1.73327 16.2333L8.49991 9.46669L15.2666 16.2334L16.2332 15.2667L9.46657 8.50003L16.2333 1.73333Z" fill="#B0B0B0"/></svg>',
  };
  const cls = {
    header: {
      index: ['header'],
      logo: ['header-logo'],
      nav: ['header-nav', 'navbar', 'navbar-expand', 'row'],
    },
    search: {
      form: ['db-search', 'col-5'],
      input: ['form-control', 'p-2'],
    },
    clients: {
      index: ['clients'],
      btn: ['clients-btn', 'clients-btn--add'],
    },
    spinner: {
      index: ['spinner-border', 'text-primary'],
      text: ['visually-hidden'],
    },
    col: {
      index: ['column'],
      sort: {
        index: ['column-sort'],
        prefix: 'column-sort--',
        text: 'column-sort--text',
        asc: 'column-sort--asc',
        desc: 'column-sort--desc',
        current: 'column-sort--current',
      },
      name: {
        index: ['column-name'],
        prefix: 'column-name--',
        action: 'column-name--action',
      },
    },
    table: {
      index: ['table'],
      col: ['table-column'],
      spinner: ['clients-spinner'],
    },
    btn: {
      index: ['btn'],
      primary: 'btn-primary',
      secondary: 'btn-secondary',
      close: 'btn-close',
      outline: 'btn-outline-secondary',
    },
  };
  const clientAttr = {
    id: {
      name: 'id',
      label: 'ID',
      type: 'number',
      isRequired: true,
      sort: 'asc',
    },
    surname: {
      name: 'surname',
      label: 'Фамилия',
      type: 'text',
      errorText: 'kok',
      isRequired: true,
      sort: 'asc',
    },
    name: {
      name: 'name',
      label: 'Имя',
      type: 'text',
      errorText: 'kok',
      isRequired: true,
    },
    lastName: {
      name: 'lastName',
      label: 'Отчество',
      type: 'text',
      errorText: 'kok',
      isRequired: false,
    },
    createdAt: {
      name: 'createdAt',
      label: 'Дата и время создания',
      type: 'date',
      isRequired: true,
      sort: 'desc',
    },
    updatedAt: {
      name: 'updatedAt',
      label: 'Последние изменения',
      type: 'date',
      isRequired: true,
      sort: 'desc',
    },
    contacts: {
      name: 'contacts',
      label: 'Контакты',
      type: 'object',
      isRequired: false,
    },
  };
  const contactsType = [
    {
      label: 'Телефон',
      value: 'phone',
      type: 'tel',
    },
    {
      label: 'Facebook',
      value: 'facebook',
      type: 'text',
    },
    {
      label: 'Email',
      value: 'email',
      type: 'email',
    },
    {
      label: 'Vk',
      value: 'vk',
      type: 'text',
    },
  ];
  const modal = getModal();

  // Приложение
  createApp();
  // Функции
  function createApp() {
    const container = document.getElementById('app');
    const header = createHeaderApp();
    const main = createMainApp();
    let timeoutInput;

    main.clientsSection.table.clientsLoad();

    header.form.addEventListener('submit', e => e.preventDefault());
    header.input.addEventListener('input', ({target}) => {
      if (timeoutInput) {
        clearTimeout(timeoutInput);
      }

      timeoutInput = setTimeout(() => {
        main.clientsSection.table.clientsLoad(target.value);
      }, 300);
    });

    container.append(header.el);
    container.append(main.el);
  }

  function createHeaderApp() {
    const headerEl = document.createElement('header');
    const logoEl = document.createElement('img');
    const navEl = document.createElement('nav');
    const searchFormEl = document.createElement('form');
    const searchInputEl = document.createElement('input');

    logoEl.src = '/img/logo.png';
    searchInputEl.type = 'search';
    searchInputEl.placeholder = 'Введите текст';

    logoEl.classList.add(...cls.header.logo);
    navEl.classList.add(...cls.header.nav);
    searchFormEl.classList.add(...cls.search.form);
    searchInputEl.classList.add(...cls.search.input);
    headerEl.classList.add(...cls.header.index);

    searchFormEl.append(searchInputEl);
    navEl.append(searchFormEl);
    headerEl.append(logoEl, navEl);

    return {
      el: headerEl,
      form: searchFormEl,
      input: searchInputEl,
    };
  }

  function createMainApp() {
    const mainEl = document.createElement('main');
    const headerEl = document.createElement('h1');
    const containerEl = document.createElement('div');
    const clientsSection = createClientsSection();

    headerEl.textContent = 'Система управления клиентами';

    headerEl.classList.add('visually-hidden');
    containerEl.classList.add('container');
    mainEl.classList.add('main');

    containerEl.append(clientsSection.el);
    mainEl.append(headerEl, containerEl);

    return {
      el: mainEl,
      clientsSection
    };
  }

  function createClientsSection() {
    const sectionEl = document.createElement('section');
    const headerEl = document.createElement('h2');
    const table = createClientsTable();

    headerEl.textContent = 'Клиенты';

    sectionEl.classList.add(...cls.clients.index);

    sectionEl.append(headerEl, table.el);

    return {
      el: sectionEl,
      table,
    };
  }

  function createClientsTable() {
    let approveDeleteClientCallback = function() {
      console.log('Клиент удален');
    };
    let approveUpdateClientCallback = function() {
      console.log('Клиент изменен');
    };
    const getDateFiledContent = function(value) {
      const dtContainer = document.createElement('div');
      const dateEl = document.createElement('time');
      const timeEl = document.createElement('span');

      dateEl.textContent = getDateByFormat(new Date(value), 'dd.mm.yyyy');
      timeEl.textContent = getDateByFormat(new Date(value), 'hh:ii');
      dtContainer.append(dateEl);
      dateEl.append(timeEl);
      dateEl.dateTime = value;
      dateEl.classList.add('clients-time');
      
      return dtContainer;
    };
    const comunmTable = [
      {
        displayField: 'id',
        text: 'ID',
        sorted: {
          type: 'asc'
        },
      },
      {
        displayField: 'surname',
        text: 'Фамилия Имя Отчество',
        thCls: cls.col.sort.text,
        sorted: {
          type: 'desc'
        },
        render: (value, rec) => [rec.surname, rec.name, rec.lastName].join(' '),
      },
      {
        displayField: 'createdAt',
        text: 'Дата и время создания',
        sorted: {
          type: 'desc'
        },
        render: value => getDateFiledContent(value),
      },
      {
        displayField: 'updatedAt',
        text: 'Последние изменения',
        sorted: {
          type: 'desc'
        },
        render: value => getDateFiledContent(value),
      },
      {
        displayField: 'contacts',
        text: 'Контакты',
        tdCls: 'client-col--contacts',
        render: value => {
          const cellContainer = document.createElement('div');
          let actionList = [];

          for (const contact of value) {
            actionList.push(createTableAction(contact.type, 'clients-action', contact.value).el);
          }

          if (actionList.length > 5) {
            const btnMoreEl = createTableAction('more', 'clients-action', 'Показать еще');
            const moreElList = actionList.slice(4);
            
            btnMoreEl.el.innerHTML = (actionList.length - 4) + '+';
            btnMoreEl.el.addEventListener('click', () => {
              btnMoreEl.tooltip.hide();
              btnMoreEl.el.remove();
              cellContainer.append(...moreElList);
            });
            actionList = [...actionList.slice(0, 4), btnMoreEl.el];
          }

          cellContainer.classList.add('col-contacts');
          cellContainer.append(...actionList);
          
          return cellContainer;
        },
      },
      {
        displayField: 'action',
        text: 'Действия',
        render: (value, rec) => {
          const cellContainer = document.createElement('div');
          const editBtnEl = createTableAction('edit', 'clients-action').el;
          const delBtnEl = createTableAction('delete', 'clients-action').el;

          editBtnEl.addEventListener('click', e => openEditClientModal(rec, approveDeleteClientCallback,
            approveUpdateClientCallback));
          delBtnEl.addEventListener('click', e => openDeleteClientModal(rec.id,  () => modal.hide(),
            approveUpdateClientCallback));

          cellContainer.classList.add('col-actions');
          cellContainer.append(editBtnEl, delBtnEl);

          return cellContainer;
        },
      },
    ];
    const table = {
      el: document.createElement('table'),
      spinner: createSpinner(),
      head: createClientsTableHead(comunmTable),
      body: createClientsTableBody(comunmTable),
      btn: document.createElement('button'),
      content: {
        list: [],
        rowList: [],
      },
      clientsLoad: function(searchValue) {
        this.body.clearContent();
        this.el.after(this.spinner.el);

        getClients(searchValue).then(list => {
          this.content.list = sortRecordsOnField(this.head.sort.name,
            list, this.head.sort.el.sortIsAsc);
  
          this.spinner.el.remove();
          this.content.rowList = this.body.createContent(
            this.content.list);
          this.el.after(this.btn);
        })
      }
    };

    approveUpdateClientCallback = function() {
      modal.hide();
      table.clientsLoad();
    };
    approveDeleteClientCallback = function() {
      modal.hide();
      table.clientsLoad();
    };


    table.spinner.el.classList.add(...cls.table.spinner);
    table.el.classList.add(cls.table.index);
    table.btn.classList.add(cls.btn.index, cls.btn.secondary, ...cls.clients.btn);
    table.btn.textContent = 'Добавить клиента';
    table.btn.addEventListener('click', () => {
      openCreateClientModal(async function(e) {
        await createClient(e);
        table.clientsLoad();
        modal.hide();
      })
    });

    for (const headCell of table.head.cellList) {
      if (typeof headCell.sortIsAsc === 'boolean') {
        headCell.addEventListener('click', ({target}) => {
          table.content.list = sortRecordsOnField(table.head.sort.name,
            table.content.list, table.head.sort.el.sortIsAsc);
          table.body.clearContent();
          table.content.rowList = table.body.createContent(
            table.content.list);
        });
      }
    }

    table.el.append(table.head.el, table.body.el);

    return table;
  }

  function createClientsTableHead(columns) {
    const headEl = document.createElement('thead');
    const clientColumn = [];
    
    for (const column of columns) {
      clientColumn.push({
        type: 'th',
        content: column.text,
        name: column.displayField,
        cls: [cls.table.col, cls.col.index, cls.col.name.index, cls.col.name.prefix + column.displayField],
        sorted: column.sorted,
        thCls: column.thCls,
      });
    }

    const row = createTableRow(clientColumn);

    for (const rowEl of row.cellList) {
      const cellConfig = clientColumn.find(el => el.name === rowEl.cellName);

      if (typeof cellConfig.thCls !== 'undefined') {
        rowEl.classList.add(cellConfig.thCls);
      }

      if (cellConfig.sorted) {
        rowEl.sortIsAsc = cellConfig.sorted.type === 'asc';

        rowEl.classList.add(cls.col.sort.index, cls.col.sort[cellConfig.sorted.type]);
        rowEl.addEventListener('click', ({target}) => {
          row.sort.el.classList.remove(cls.col.sort.current);
          target.sortIsAsc = !target.sortIsAsc;
          target.classList.add(cls.col.sort.current);
          target.classList.replace(target.sortIsAsc ? cls.col.sort.desc : cls.col.sort.asc,
            target.sortIsAsc ? cls.col.sort.asc : cls.col.sort.desc);
          row.sort.el = target;
          row.sort.name = target.cellName;
        });
        
        if (!row.sort) {
          row.sort = {
            el: rowEl,
            name: rowEl.cellName,
          };
          rowEl.classList.add(cls.col.sort.current);
        }
      }
    }

    headEl.append(row.el);

    return {
      el: headEl,
      cellList: row.cellList,
      sort: row.sort,
    }
  }

  function createClientsTableBody(columns) {
    const bodyEl = document.createElement('tbody');
    const rowParam = {
      cls: ['bg-white'],
    };
    const clearContent = () => bodyEl.innerHTML = '';

    const createContent = function (clientList) {
      const rowElList = [];

      for (const client of clientList) {
        const clientColumn = [];

        for (const column of columns) {
          let content = '';
          let cls = ['clients-col'];

          if (typeof column.render === 'function') {
            content = column.render(client[column.displayField], client);
          } else {
            content = client[column.displayField];
          }

          if (typeof column.tdCls !== 'undefined') {
            if (Array.isArray(column.tdCls)) {
              cls.push(...column.tdCls);
            } else {
              cls.push(column.tdCls);
            }
          }

          clientColumn.push({
            type: 'td',
            content,
            cls,
          });
        }

        rowElList.push(createTableRow(clientColumn, rowParam));

        bodyEl.append(rowElList[rowElList.length - 1].el);
      }

      return rowElList;
    };

    return {
      el: bodyEl,
      clearContent,
      createContent
    }
  }

  function createTableRow(contentList, rowParam = {}) {
    const tableRow = {
      el: document.createElement('tr'),
      cellList: [],
    };

    for (const content of contentList) {
      const cellEl = document.createElement(content.type);

      if (content.name) {
        cellEl.cellName = content.name;
      }

      if (Array.isArray(content.content)) {
        cellEl.append(...content.content);
      } else {
        cellEl.append(content.content);
      }

      if (content.cls) {
        cellEl.classList.add(...content.cls);
      }

      tableRow.cellList.push(cellEl);
    }

    if (rowParam.cls) {
      tableRow.el.classList.add(...rowParam.cls);
    }

    tableRow.el.append(...tableRow.cellList);

    return tableRow;
  }

  function createTableAction(action, classPrefix = 'action', tooltipText) {
    const btn = {
      el: document.createElement('button')
    };

    btn.el.classList.add(classPrefix, classPrefix + '--' + action);

    switch (action) {
      case 'add':
        btn.el.innerHTML = 'Добавить';
        break;
      case 'edit':
        btn.el.innerHTML = 'Изменить';
        break;
      case 'delete':
        btn.el.innerHTML = 'Удалить';
        break;
      default:
        btn.el.innerHTML = '';
    }

    if (tooltipText) {
      btn.tooltip = new bootstrap.Tooltip(btn.el, {
        title: tooltipText,
        customClass: 'custom-tooltip',
        placement: 'top',
      });
    }

    return btn;
  }

  function createSpinner() {
    const container = document.createElement('div');
    const spinnerEl = document.createElement('div');
    const spinnerText = document.createElement('span');

    spinnerEl.classList.add(...cls.spinner.index);
    spinnerEl.role = 'status';
    spinnerText.classList.add(...cls.spinner.text);
    spinnerText.innerHTML = 'Загрузка...';

    spinnerEl.append(spinnerText);
    container.append(spinnerEl);

    return {
      el: container,
    }
  }

  function getModal() {
    const modalEl = document.getElementById('modal');
    const modal = new bootstrap.Modal(modalEl);
    const closeBtnEl = modalEl.querySelector('.js-btn-close');

    closeBtnEl.addEventListener('click', () => {
      modal.hide();
    });

    return modal;
  }
  // проверить - начало
  function getModalContent() {
    const modalEl = document.getElementById('modal');
    const titleEl = modalEl.querySelector('.modal-title');
    const bodyEl = modalEl.querySelector('.modal-body');
    const footerEl = modalEl.querySelector('.modal-footer');
    const formEl = document.createElement('form');
    const approveBtnEl = document.createElement('button');
    const cancelBtnEl = document.createElement('button');

    titleEl.innerHTML = bodyEl.innerHTML = footerEl.innerHTML = '';
    formEl.id = 'form';
    formEl.classList.add('modal-form');
    approveBtnEl.classList.add('modal-btn', 'modal-btn--approve', 'btn', 'btn-primary');
    approveBtnEl.type = 'submit';
    approveBtnEl.setAttribute('form', 'form');
    cancelBtnEl.classList.add('btn', 'btn-link', 'modal-btn', 'modal-btn--cancel', 'text-black');
    cancelBtnEl.type = 'button';
    bodyEl.append(formEl);
    footerEl.append(approveBtnEl, cancelBtnEl);

    return {
      title: titleEl,
      form: formEl,
      action: {
        approve: approveBtnEl,
        cancel: cancelBtnEl,
      }
    };
  }
  
  function openCreateClientModal(approveHandler) {
    const modalContent = getModalContent();
    const addContactBtnEl = getAddContactBtn();
    
    for (const param of ['surname', 'name', 'lastName']) {
      modalContent.form.append(getFormInput(clientAttr[param]));
    }

    modalContent.title.innerHTML = 'Новый клиент';
    modalContent.action.approve.innerHTML = 'Сохранить';
    modalContent.action.cancel.innerHTML = 'Отмена';
    modalContent.action.cancel.addEventListener('click', () => modal.hide());
    modalContent.form.addEventListener('submit', approveHandler);
    modalContent.form.append(addContactBtnEl);
    
    modal.show();
  }

  function openEditClientModal(client, cancelCallback, approveCallback) {
    const modalContent = getModalContent();
    const idEl = document.createElement('span');
    const addContactBtnEl = getAddContactBtn(client.contacts);
    
    for (const param of ['surname', 'name', 'lastName']) {
      modalContent.form.append(getFormInput(clientAttr[param], client[param]));
    }

    idEl.classList.add('modal-title--lower');
    idEl.innerHTML = 'ID: ' + client.id;
    modalContent.title.innerHTML = 'Изменить данные';
    modalContent.title.append(idEl);
    modalContent.action.approve.innerHTML = 'Сохранить';
    modalContent.action.cancel.innerHTML = 'Удалить клиента';
    modalContent.action.cancel.addEventListener('click', e => {
      e.preventDefault();
      openDeleteClientModal(client.id, function() {
        openEditClientModal(client);
      }, cancelCallback);
    });
    modalContent.form.append(addContactBtnEl);
    modalContent.form.addEventListener('submit', async e => {
      e.preventDefault();
    
      const data = getFormData(e.target);

      await updateClient(client.id, data);
      
      if (typeof approveCallback === 'function') {
        approveCallback();
      }
    });
    
    modal.show();
  }

  function getAddContactBtn(contacts = []) {
    const container = document.createElement('div');
    const btnEl = document.createElement('button');
    let contactCount = contacts.length;

    container.append(btnEl);
    container.classList.add('modal-contacts');
    btnEl.classList.add('btn', 'modal-btn--add');
    btnEl.textContent = 'Добавить контакт';
    btnEl.addEventListener('click', e => {
      e.preventDefault();
      contactCount++;
      
      btnEl.before(getContactInput());

      if (contactCount === 10) {
        btnEl.remove();
      }

      if (!container.classList.contains('p-3')) {
        container.classList.add('p-3');
      }
    });

    if (contactCount > 0) {
      container.classList.add('p-3');
      
      for (const contact of contacts) {
        btnEl.before(getContactInput(contact));
      }
    }

    return container;
  }

  function getContactInput({value, type} = {}) {
    const controlEl = document.createElement('div');
    const selectEl = document.createElement('select');
    const inputEl = document.createElement('input');
    const delBtnEl = document.createElement('button');

    for (const type of contactsType) {
      const optEl = document.createElement('option');

      optEl.value = type.value;
      optEl.textContent = type.label;
      selectEl.append(optEl);
    }

    controlEl.classList.add('input-group', 'contact');
    inputEl.classList.add('form-control', 'contact-input');
    inputEl.placeholder = 'Введите данные контакта';
    inputEl.name = 'value';
    inputEl.type = contactsType[0].type;
    delBtnEl.type = 'button';
    delBtnEl.addEventListener('click', () => controlEl.remove());
    delBtnEl.classList.add(...cls.btn.index, cls.btn.outline, cls.btn.close);
    delBtnEl.style.height = 'auto';
    selectEl.classList.add('input-group-text', 'form-control');
    selectEl.name = 'type';
    selectEl.addEventListener('change', e => inputEl.type = contactsType.find(type => type.value === e.target.value).type);
    controlEl.append(selectEl, inputEl, delBtnEl);

    if (value) {
      inputEl.value = value;
    }

    if (type) {
      selectEl.value = type;
    }

    return controlEl;
  }

  function openDeleteClientModal(id, cancelHandler, approveCallback) {
    const modalContent = getModalContent();
    const labelEl = document.createElement('label');

    labelEl.textContent = 'Вы действительно хотите удалить данного клиента?';
    labelEl.classList.add('modal-label');
    modalContent.title.innerHTML = 'Удалить клиента';
    modalContent.form.append(labelEl);
    modalContent.form.addEventListener('submit', async e => {
      e.preventDefault();
      await deleteClient(id);

      if (typeof approveCallback === 'function') {
        approveCallback();
      }
    });
    modalContent.action.approve.innerHTML = 'Удалить';
    modalContent.action.cancel.innerHTML = 'Отмена';
    modalContent.action.cancel.addEventListener('click', () => typeof cancelHandler === 'function'
      ? cancelHandler()
      : modal.hide()
    );
    
    modal.show();
  }
  
  function getFormInput({name, label, type, isRequired = false, errorText}, value) {
    const container = document.createElement('div');
    const inputEl = document.createElement('input');
    const labelEl = document.createElement('label');

    inputEl.classList.add('form-control');
    inputEl.name = name;
    inputEl.type = type;
    inputEl.required = isRequired;
    inputEl.id = 'form-input-' + name;
    labelEl.classList.add('form-label', 'w-100');
    labelEl.textContent = label;
    labelEl.setAttribute('for', 'form-input-' + name);
    labelEl.append(inputEl);
    container.classList.add('mb-2', 'modal-control');

    if (isRequired) {
      labelEl.classList.add('form-label--required');
    }
    
    if (value) {
      inputEl.value = value;
      container.append(labelEl);
    } else {
      inputEl.placeholder = label + (isRequired ? '*' : '');
    }

    container.append(inputEl);

    return container;
  }

  function getFormData(form) {
    const formElements = form.elements;
    const data = {name: '', surname: '', lastName: '', contacts: []};
    
    for (const element of formElements) {
      switch (element.name) {
        case 'surname':
          data.surname = element.value;
          break;
        case 'name':
          data.name = element.value;
          break;
        case 'lastName':
          data.lastName = element.value;
          break;
        case 'type':
          data.contacts.push({
            type: element.value,
            value: '',
          });
          break;
        case 'value':
          data.contacts[data.contacts.length - 1].value = element.value;
          break;
      }
    }

    return data;
  }
  
  // проверить - конец
  function sortRecordsOnField(fieldName, records = [], orderByAsc = false) {

    let sortArray = records.sort((a, b) =>  a[fieldName] > b[fieldName] 
      ? 1 : a[fieldName] < b[fieldName] 
      ? -1 : 0);

    return orderByAsc ? sortArray : sortArray.reverse();
  }

  function getDateByFormat(x, y) {
    if (y) {
      var z = {
        m: x.getMonth() + 1,
        d: x.getDate(),
        h: x.getHours(),
        i: x.getMinutes(),
        s: x.getSeconds()
      };
      y = y.replace(/(m+|d+|h+|i+|s+)/g, function(v) {
        return ((v.length > 1 ? '0' : '') + z[v.slice(-1)]).slice(-2);
      });

      return y.replace(/(y+)/g, function(v) {
          return x.getFullYear().toString().slice(-v.length);
      });

    }

    return x;
  }
  
  async function getClients(query) {
    const response = await fetch(apiUrl + `/clients${query ? '?search=' + query : ''}`);
    const clientList = await response.json();
    
    return clientList;
  }
  
  async function createClient(e) {
    e.preventDefault();
    
    const data = getFormData(e.target);
    const response = await fetch(`${apiUrl}/clients`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json;charset=utf-8'
      },
      body: JSON.stringify(data),
    });
  }

  async function updateClient(id, data) {
    const response = await fetch(`${apiUrl}/clients/${id}`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json;charset=utf-8'
      },
      body: JSON.stringify(data),
    });
  }
  
  async function deleteClient(id) {
    const response = fetch(`${apiUrl}/clients/${id}`, {
      method: 'DELETE',
    });
  }
})();

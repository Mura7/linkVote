export default class LinkList {
  constructor() {
    this.list = [];
    this.orderBy = '';
    this.init();
  }
  init() {
    this.getList();
  }
  getList() {
    const myList = JSON.parse(localStorage.getItem('myList'));
    if (myList) {
      this.list = myList;
    }
    return this.list;
  }
  getPaginationList(page_number = 1) {
    const list = this.getList();
    list.sort((a, b) => {
      const aDateDiffFromNow = this.getDateFromNow(a.date);
      const bDateDiffFromNow = this.getDateFromNow(b.date);
      const dateOrder = aDateDiffFromNow - bDateDiffFromNow;
      if (this.orderBy === 'mostVote') {
        return b.vote - a.vote || dateOrder;
      } else if (this.orderBy === 'lessVote') {
        return a.vote - b.vote || dateOrder;
      }
      return dateOrder;
    });
    return this.paginate(list, page_number);
  }
  setList(newList) {
    localStorage.setItem('myList', JSON.stringify(newList));
    this.list = newList;
  }
  addLink(name, url) {
    const newListItem = { name, url, vote: 0, date: new Date(), id: Math.abs(new Date()) };
    const newList = [...this.list, newListItem];
    this.setList(newList);
  }
  removeLink(id) {
    const index = this.findItemIndex(id);
    this.list.splice(index, 1);
    this.setList(this.list);
  }
  upVote(id) {
    const index = this.findItemIndex(id);
    this.list[index].vote += 1;
    this.setList(this.list);
  }
  downVote(id) {
    const index = this.findItemIndex(id);
    this.list[index].vote -= 1;
    this.setList(this.list);
  }
  findItemIndex(itemId) {
    return this.list.findIndex(({ id }) => id === itemId);
  }
  getDateFromNow(date) {
    const nowDate = new Date();
    const linkCreateDate = new Date(date);
    const diffTime = Math.abs(nowDate - linkCreateDate);
    return diffTime;
  }
  setOrderBy(type) {
    this.orderBy = type;
  }
  paginate(array, page_number) {
    const page_size = 5;
    const newArrayList = [...array];
    return newArrayList.slice((page_number - 1) * page_size, page_number * page_size);
  }
}

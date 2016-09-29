import Employee from 'types/Employee';

function Manager () {
    this.reports = [];
}

Manager.prototype = new Employee();

export default Manager;
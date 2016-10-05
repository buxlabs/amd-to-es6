import History from 'lavaca/net/History';
import Application from 'lavaca/mvc/Application';
import TodosController from 'app/net/TodosController';
import $ from '$';
import 'lavaca/ui/DustTemplate';

History.overrideStandardsMode();

Application.prototype.viewRootSelector = '#todoapp';

var app = new Application(function () {
    this.router.add({
        '/': [TodosController, 'home', {filter: 'all'}],
        '/active': [TodosController, 'home', {filter: 'active'}],
        '/completed': [TodosController, 'home', {filter: 'completed'}]
    });

    $(document.body).find('aside.learn a').addClass('ignore');
});

export default app;

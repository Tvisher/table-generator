import { createStore } from 'vuex'

const store = createStore({
    state() {
        return {
            employeesData: [
                {
                    id: 0,
                    name: "Натальчук Денис",
                    position: "Управляющий студии",
                    bid: 30952,
                },
                {
                    id: 1,
                    name: "Медонин Евгений",
                    position: "Программист",
                    bid: 23524,
                },
                {
                    id: 2,
                    name: "Кочнев Михаил",
                    position: "Дизайнер",
                    bid: 14857,
                },
            ],
            stages: [
                {
                    id: 0,
                    name: 'Стадия 1. Разработка технического задания на разработку корпоративного сайта',
                    phases: []
                },

                {
                    id: 1,
                    name: 'Стадия 2. Сбор требований, анализ и систематизация требований Заказчика к сайту',
                    phases: []
                }
            ]
        }
    },
    mutations: {
        addEmployee(state, data) {
            console.log(state.employeesData);
            state.employeesData.push(data);
        },
        remooveEmployee(state, id) {
            state.employeesData = state.employeesData.filter(
                (employee) => employee.id != id
            );
        },
        modifyEmployee(state, id) {
            const currentEmployee = state.employeesData.find((item) => {
                return item.id === id;
            });
            currentEmployee.employeeModify = !currentEmployee.employeeModify;
        },

        addStage(state, data) {
            state.stages.push(data);
        },

        addPhase(state, dataObj) {
            console.log(dataObj);
        }
    }
});

export default store;
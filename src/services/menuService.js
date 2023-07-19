import { httpService } from './httpService';

export const menuService = {
    createMenu: (data) => {
        return httpService.post(`/menu/CreateMenu`, data);
    },
    updateMenu: ({ menuID, newMenu }) => {
        return httpService.put(`/menu/UpdateMenu?menuID=${menuID}`, newMenu);
    },
    getMenuList: ({ page, pageSize }) => {
        return httpService.get(`/menu/GetListMenu?page=${page}&pageSize=${pageSize}`);
    },
    getMenuInfo: (menuId) => {
        return httpService.get(`/menu/GetMenuById?menuId=${menuId}`);
    },
}
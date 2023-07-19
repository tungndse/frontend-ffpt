import { httpService } from './httpService';

export const settingService = {
    getListTimeSlot: () => {
        return httpService.get(`/settings/GetListTimeslot`)
    },
}   
export const formatColorStatus = (statusId) => {
    let color = '';
    // eslint-disable-next-line default-case
    switch (statusId) {
        case 1:
            return (color = 'red');
        case 2:
            return (color = '#f1c40f');
        case 3:
            return (color = '#f36522');
        case 4:
            // eslint-disable-next-line no-unused-vars
            return (color = 'green');
    }
};
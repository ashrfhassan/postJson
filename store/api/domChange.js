export default {
    getLastRequestID: (tbodyID) => {
        let lastRequest = $('#' + tbodyID +' tr').last();
        if(lastRequest.length == 0)
        return 0;
        else
        return lastRequest.prop("id").split("-")[2];
    },
    getLastCollectionProjectID: () => {
        let lastRequest = $('#projects-collection tr').last();
        if(lastRequest.length == 0)
        return 0;
        else
        return lastRequest.prop("id").split("-")[2];
    }
}
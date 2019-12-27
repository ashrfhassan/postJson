export default {
    newHistory: (state, request) => {
        state.historyRequests.push(request);
    },
    newProject: (state, project) => {
        state.collectionProjects.push(project);
    },
    setCurrentBodyType: (state, newValue) => {
        state.currentBodyType = newValue;
    },
    setCurrentHeaders: (state, newValue) => {
        state.currentHeaders.push(newValue);
    },
    setCurrentRawBody: (state, newValue) => {
        state.currentRawBody = newValue;
    },
    setCurrentFormBody: (state, newValue) => {
        state.currentFormBody.push(newValue);
    }
}
export default {
    newHistory: (state, request) => {
        state.historyRequests.push(request);
    },
    newProject: (state, project) => {
        state.collectionProjects.push(project);
    }
}
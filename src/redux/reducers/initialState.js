import { get } from 'lodash';
import { loadState } from '../store/localStorage';

const { loggedIn, user, token, modules } = get(loadState(), "auth") || {};

const initialState = {

    auth: {
        token: token || "",
        loggedIn: false,
        user: user,
    },

    course: {

        selectedCourse: {


            assignments: [],
            topics: [],
            courseStructure: []

        },

        selectedTopic: {

        },
        selectedLesson: {

        },
        selectedAssignment: {


        },
        selectedQuestionGroup: {},
        selectedQuestion: {},
        coursesList: [],
    },
    skillsList: []


}

export default initialState
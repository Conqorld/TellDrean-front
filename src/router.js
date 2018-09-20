import Home from '@/components/Home'
import createStory from '@/components/createStory'
import createPlotStory from '@/components/createPlotStory'
import showStoryDetail from '@/components/showStoryDetail'
import logIn from '@/components/logIn'
import register from '@/components/register'
const routes =[
  {
    path: '/',
    name: 'Home',
    component: Home
  },
  {
    path: '/createStory',
    name: 'createStory',
    component: createStory
  },
  {
    path: '/createPlotStory',
    name: 'createPlotStory',
    component: createPlotStory
  },
  {
    path: '/showStoryDetail',
    name: 'showStoryDetail',
    component: showStoryDetail
  },
  {
    path: '/logIn',
    name: 'logIn',
    component: logIn
  },
  {
    path: '/register',
    name: 'register',
    component: register
  }
]
export default routes

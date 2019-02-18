const Home = () => import('@/components/Home')
const createStory = () => import('@/components/createStory')
const createPlotStory = () => import('@/components/createPlotStory')
const showStoryDetail = () => import('@/components/showStoryDetail')
const logIn = () => import('@/components/logIn')
const register = () => import('@/components/register')
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

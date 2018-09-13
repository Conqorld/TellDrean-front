import Home from '@/components/Home'
import createStory from '@/components/createStory'
import createPlotStory from '@/components/createPlotStory'
import showStoryDetail from '@/components/showStoryDetail'
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
  }
]
export default routes

import React from 'react'
import CIcon from '@coreui/icons-react'
import { BsHouseDoor } from 'react-icons/bs'
import { MdOutlineTravelExplore } from 'react-icons/md'
import { CiSaveDown2 } from 'react-icons/ci'
import { LuMessagesSquare } from 'react-icons/lu'
import { CgTrending } from 'react-icons/cg'
import { AiOutlineSetting } from 'react-icons/ai'
import { CNavGroup, CNavItem, CNavTitle } from '@coreui/react'

const _nav = [
  {
    component: CNavItem,
    name: 'Feed',
    to: '/feed',
    icon: <BsHouseDoor />,
    // items: [],
  },
  {
    component: CNavItem,
    name: 'Explore',
    to: '/explore',
    icon: <MdOutlineTravelExplore />,
    //items: []
  },
  {
    component: CNavItem,
    name: 'My Favorites',
    to: '/favorites',
    icon: <CiSaveDown2 />,
    // items: [

    // ],
  },
  {
    component: CNavItem,
    name: 'Message',
    to: '/message',
    icon: <LuMessagesSquare />,
  },
  {
    component: CNavItem,
    name: 'Trends',
    to: '/trends',
    icon: <CgTrending />,
    //items:[]
  },
  {
    component: CNavItem,
    name: 'setting',
    to: '/setting',
    icon: <AiOutlineSetting />,
    //items:[]
  },
]

export default _nav

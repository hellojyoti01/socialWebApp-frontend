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
    to: '/',
    icon: <CIcon icon={BsHouseDoor} customClassName="nav-icon" />,
    // items: [],
  },
  {
    component: CNavTitle,
    name: 'Explore',
    to: '/explore',
    icon: <CIcon icon={MdOutlineTravelExplore} customClassName="nav-icon" />,
    //items: []
  },
  {
    component: CNavTitle,
    name: 'My Favorites',
    icon: <CIcon icon={CiSaveDown2} customClassName="nav-icon" />,
    // items: [

    // ],
  },
  {
    component: CNavItem,
    name: 'Message',
    to: '/message',
    icon: <CIcon icon={LuMessagesSquare} customClassName="nav-icon" />,
  },
  {
    component: CNavTitle,
    name: 'Trends',
    icon: <CIcon icon={CgTrending} customClassName="nav-icon" />,
    //items:[]
  },
  {
    component: CNavTitle,
    name: 'setting',
    icon: <CIcon icon={AiOutlineSetting} customClassName="nav-icon" />,
    //items:[]
  },
]

export default _nav

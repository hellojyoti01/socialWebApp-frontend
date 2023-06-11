import React from 'react'
import { Link, NavLink, useLocation } from 'react-router-dom'
import PropTypes from 'prop-types'
import { useNavigate } from 'react-router-dom'
import s from '../css/app_sidebar_nav.module.css'

export const AppSidebarNav = ({ items }) => {
  const navigate = useNavigate()

  /* ------------------------ Side Bar Menu Url Modify ------------------------ */
  const navLink = (name, icon, to) => {
    return (
      <div className={s.item} onClick={() => navigate(to)}>
        {icon && icon}

        <span>{name}</span>
      </div>
    )
  }

  /* -------------------------------- Menu Item ------------------------------- */
  const navItem = (item, index) => {
    const { component, name, to, icon } = item

    return (
      <li className={s.item_list} key={index}>
        {navLink(name, icon, to)}
      </li>
    )
  }

  return (
    <React.Fragment>
      <div className={s.container}>
        <ol className={s.warper}>{items && items.map((item, index) => navItem(item, index))}</ol>
      </div>
    </React.Fragment>
  )
}

AppSidebarNav.propTypes = {
  items: PropTypes.arrayOf(PropTypes.any).isRequired,
}

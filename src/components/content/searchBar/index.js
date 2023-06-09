import React from 'react'
import s from './search.module.css'
import { AiOutlinePlusCircle } from 'react-icons/ai'
import { CiSearch } from 'react-icons/ci'
function Search() {
  return (
    <div className={s.container}>
      <div className={s.searchBox}>
        <input className={s.searchInput} type="text" name="" placeholder="Search ....." />
        <button className={s.searchButton} href="#">
          <i className={s.material_icons}>
            <CiSearch />
          </i>
        </button>
      </div>
      <div className={s.create_post}>
        <button className={s.btn}>
          Create New Post
          <span>
            <AiOutlinePlusCircle size={'30px'} />
          </span>
        </button>
      </div>
    </div>
  )
}

export default Search

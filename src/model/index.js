import React from 'react'

import s from './model.module.css'
const Model = ({ rander }) => {
  return (
    <>
      <div className={s.model}>{rander()}</div>
    </>
  )
}

export default Model
// container.ontainer.propTypes = {
//   child: PropTypes.element,
// }

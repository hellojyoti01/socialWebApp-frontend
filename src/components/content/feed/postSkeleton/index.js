//3rd party
import React from 'react'

import { Skeleton } from '@mui/material'

//css
import s from './postSkeleton.module.css'
function Index() {
  return (
    <>
      <div className={s.post_card}>
        <div className={s.post_header}>
          <div className={s.post_profile}>
            <span className={s.post_avtar}>
              {' '}
              <Skeleton animation="wave" variant="circular" width="32px" height="32px" />
              <Skeleton
                variant="text"
                sx={{ fontSize: '1rem', width: '100px', marginInline: '10px' }}
              />
            </span>

            <Skeleton variant="circular" sx={{ fontSize: '1rem', width: '20px', height: '20px' }} />
          </div>
          <div className={s.post_location}>
            <Skeleton variant="text" sx={{ fontSize: '0.8rem', width: '150px' }} />
          </div>
        </div>

        <Skeleton
          sx={{
            height: 190,
          }}
          animation="wave"
          variant="rounded"
        />

        <div className={s.post_footer}>
          <span className={s.icon_group}>
            {' '}
            <span className={s.left_icon}>
              {' '}
              <Skeleton
                animation="wave"
                variant="text"
                style={{ fontSize: '24px', width: '20px' }}
              />
              <Skeleton
                animation="wave"
                variant="text"
                style={{ fontSize: '24px', width: '20px' }}
              />
              <Skeleton
                animation="wave"
                variant="text"
                style={{ fontSize: '24px', width: '20px' }}
              />
            </span>
            <Skeleton
              animation="wave"
              variant="circular"
              style={{ height: '20pxs', width: '20px' }}
            />
          </span>
          <Skeleton animation="wave" variant="text" style={{ fontSize: '1rem', width: '100%' }} />
          <Skeleton animation="wave" variant="text" style={{ fontSize: '1rem', width: '100%' }} />

          <div>
            <span className={s.left_icon}>
              <Skeleton
                animation="wave"
                variant="text"
                style={{ fontSize: '24px', width: '30px', height: '16px' }}
              />
              <Skeleton
                animation="wave"
                variant="text"
                style={{ fontSize: '24px', width: '30px', height: '16px' }}
              />
              <Skeleton
                animation="wave"
                variant="text"
                style={{ fontSize: '24px', width: '30px', height: '16px' }}
              />
            </span>
          </div>

          {/*Comment Page*/}
          <div className={s.comments}>
            <Skeleton animation="wave" variant="text" style={{ fontSize: '1rem', width: '100%' }} />
            <Skeleton animation="wave" variant="text" style={{ fontSize: '1rem', width: '100%' }} />
          </div>
        </div>
      </div>
    </>
  )
}

export default Index

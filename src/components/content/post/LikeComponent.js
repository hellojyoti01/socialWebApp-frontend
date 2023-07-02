import styles from './styles.module.css'

const Like = () => {
  return (
    <div className={styles['main-content']}>
      <h1>React CSS Heart Animation</h1>
      <a href="https://www.example.com">More examples</a>

      <input type="checkbox" id={styles['checkbox']} className={styles['checkbox']} />
      <label htmlFor={styles['checkbox']} className={styles['svg']}>
        <svg viewBox="0 0 100 100">
          <g className={styles['grp1']}>
            <path className={styles['oval']} d="M45 20 C55 0 75 0 75 20" />
            <path
              id="heart"
              className={styles['heart']}
              d="M39,29.7C36.8,28 34.4,27 32,27C29.6,27 27.2,28 25,29.7C22.8,31.4 21,33.6 21,36C21,38.4 22.8,40.6 25,42.3L32,49.3L39,42.3C41.2,40.6 43,38.4 43,36C43,33.6 41.2,31.4 39,29.7Z"
            />
            <path
              className={styles['heart']}
              d="M39,29.7C36.8,28 34.4,27 32,27C29.6,27 27.2,28 25,29.7C22.8,31.4 21,33.6 21,36C21,38.4 22.8,40.6 25,42.3L32,49.3L39,42.3C41.2,40.6 43,38.4 43,36C43,33.6 41.2,31.4 39,29.7Z"
            />
          </g>
          <g className={styles['grp2']}>
            <path className={styles['oval']} d="M80 20 C90 0 110 0 110 20" />
            <path className={styles['oval1']} d="M80 20 C80 0 110 0 110 20" />
            <path id="main-circ" className={styles['circle']} d="M95 30 C95 10 75 10 75 30" />
            <path className={styles['circle']} d="M95 30 C95 50 75 50 75 30" />
          </g>
          <g className={styles['grp3']}>
            <path className={styles['oval']} d="M120 20 C130 0 150 0 150 20" />
            <path className={styles['oval1']} d="M120 20 C120 0 150 0 150 20" />
            <path className={styles['circle']} d="M135 30 C135 10 115 10 115 30" />
            <path id="main-circ" className={styles['circle']} d="M135 30 C135 50 115 50 115 30" />
          </g>
          <g className={styles['grp4']}>
            <path className={styles['oval']} d="M160 20 C170 0 190 0 190 20" />
            <path className={styles['oval1']} d="M160 20 C160 0 190 0 190 20" />
            <path className={styles['circle']} d="M175 30 C175 10 155 10 155 30" />
            <path id="main-circ" className={styles['circle']} d="M175 30 C175 50 155 50 155 30" />
          </g>
          <g className={styles['grp5']}>
            <path className={styles['oval']} d="M200 20 C210 0 230 0 230 20" />
            <path className={styles['oval1']} d="M200 20 C200 0 230 0 230 20" />
            <path className={styles['circle']} d="M215 30 C215 10 195 10 195 30" />
            <path id="main-circ" className={styles['circle']} d="M215 30 C215 50 195 50 195 30" />
          </g>
        </svg>
      </label>
    </div>
  )
}

export default Like

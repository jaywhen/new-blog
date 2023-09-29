/* eslint sort-keys: error */
export default {
  components: {
    h1: ({ children }) => (
      <h1 style={{
        backgroundClip: 'text',
        backgroundImage: 'linear-gradient(90deg,#7928CA,#FF0080);',
        '-webkit-background-clip': 'text',
        '-webkit-text-fill-color': 'transparent',
      }}
      >
        {children}
      </h1>
    )
  },
  darkMode: true,
  footer: (
    <div>
      <hr />
      <a href="https://twitter.com/jaywhen6" target="_blank">Twitter</a>
      {" · "}
      <a href="https://github.com/jaywhen" target="_blank">Github</a>
      {" · "}
      <a href="https://unsplash.com/@jaywhen" target="_blank">Unsplash</a>
      {" · "}
      <a href="mailto:jaywhenx@gmail.com">jaywhenx@gmail.com</a>
      <small style={{ display: 'block', marginTop: '8rem' }}>
        <abbr
          title="This site and all its content are licensed under a Creative Commons Attribution-NonCommercial 4.0 International License."
          style={{ cursor: 'help' }}
        >
          CC BY-NC 4.0
        </abbr>{' '}
        {new Date().getFullYear()} © Jaywhen Xiang.
        <style jsx>{`
          a {
            float: right;
          }

          @media screen and (max-width: 480px) {
            article {
              padding-top: 2rem;
              padding-bottom: 4rem;
            }
          }
        `}</style>
      </small>
    </div>
  )
}

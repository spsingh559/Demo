import React from 'react'
import styles from './styles'
import Text from './Text'

export default class Quote extends React.Component {
  render () {
    const {data} = this.props

    return (
      <div className="QuoteTweet" style={styles.QuoteTweet}>
        <a className="QuoteTweet-link" style={styles.QuoteLink} href={`https://twitter.com/${data.user.screen_name}/status/${data.id_str}`} target='_blank' />
        <div className="QuoteTweet-innerContainer" style={styles.QuoteTweetInner}>
          <div className="QuoteTweet-originalAuthor" style={styles.QuoteTweetAuthor}>
            <b>{data.user.name}</b>
            <span className="QuoteTweet-screenname" style={styles.time}>{' '}{'@'}{data.user.screen_name}</span>
          </div>
          <div className="QuoteTweet-text" style={styles.QuoteTweetText}>
            <Text data={data} />
          </div>
        </div>
      </div>
    )
  }
}

Quote.propTypes = {
  'data': React.PropTypes.object
}

Quote.displayName = 'Quote'

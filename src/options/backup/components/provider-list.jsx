import React from 'react'
import PropTypes from 'prop-types'
import Styles from './provider-list.css'

export function ProviderList({ onChange, provider }) {
    return (
        <div>
            <p className={Styles.subTitle}>Currently Available</p>
            <form>
                <label>
                    <input
                        type="radio"
                        checked={provider === 'google-drive'}
                        onChange={() => onChange('google-drive')}
                    />
                    <span style={{ cursor: 'pointer' }}>
                        <img
                            className={Styles.logo}
                            src={'img/google-drive.png'}
                        />
                        <span className={Styles.name}>Google Drive</span>
                    </span>
                    <br />
                    <input
                        type="radio"
                        checked={provider === 'local-hard-drive'}
                        onChange={() => onChange('local-hard-drive')}
                    />
                    <span style={{ cursor: 'pointer' }}>
                        <img
                            className={Styles.logo}
                            src={'img/google-drive.png'}
                        />
                        <span className={Styles.name}>Local Hard Drive</span>
                    </span>
                </label>
            </form>
            <br />
            <p className={Styles.subTitle}>Future Options</p>
            <div className={Styles.voteContainer}>
                <a
                    className={Styles.vote}
                    target="blank"
                    href="https://goo.gl/forms/Lh5pPWc75r7ds2m63"
                >
                    Vote
                </a>
                <span>on your favorite provider</span>
            </div>
            <input type="radio" disabled />
            <span className={Styles.disabled}>Own Cloud</span>
            <br />
            <input type="radio" disabled />
            <span className={Styles.disabled}>Self hosting</span>
            <br />
            <input type="radio" disabled />
            <span className={Styles.disabled}>Own Cloud</span>
            <br />
            <input type="radio" disabled />
            <span className={Styles.disabled}>Dropbox</span>
            <br />
            <input type="radio" disabled />
            <span className={Styles.disabled}>AWS</span>
            <br />
        </div>
    )
}

ProviderList.propTypes = {
    onChange: PropTypes.func.isRequired,
    provider: PropTypes.string,
}

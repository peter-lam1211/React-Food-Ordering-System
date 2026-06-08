import React, { useEffect } from 'react'
import '../css/DeliveryPage/Chatbox.css'

export default function Chatbox() {

    const showChatbox = () => {
        const chatboxMessage = document.querySelector('.chatbox-message-wrapper')
        chatboxMessage.classList.toggle('show')
    }

    var time = 0

    useEffect(() => {
        // MESSAGE INPUT
        const textarea = document.querySelector('.chatbox-message-input')
        const chatboxForm = document.querySelector('.chatbox-message-form')

        textarea.addEventListener('input', function () {
            let line = textarea.value.split('\n').length

            if (textarea.rows < 6 || line < 6) {
                textarea.rows = line
            }

            if (textarea.rows > 1) {
                chatboxForm.style.alignItems = 'flex-end'
            } else {
                chatboxForm.style.alignItems = 'center'
            }
        })

        // CHATBOX MESSAGE
        const chatboxMessageWrapper = document.querySelector('.chatbox-message-content')

        chatboxForm.addEventListener('submit', function (e) {
            e.preventDefault()

            if (isValid(textarea.value) && time === 0) {
                writeMessage()
                setTimeout(autoReply1, 1000)
                time += 1
            }

            if (isValid(textarea.value) && time === 1) {
                writeMessage()
                setTimeout(autoReply2, 1000)
            }
        })

        function addZero(num) {
            return num < 10 ? '0' + num : num
        }

        function writeMessage() {
            const today = new Date()
            let message = `<div class="chatbox-message-item sent">
                                <span class="chatbox-message-item-text">
                                    ${textarea.value.trim().replace(/\n/g, '<br>\n')}
                                </span>
                                <span class="chatbox-message-item-time">${addZero(today.getHours())}:${addZero(today.getMinutes())}</span>
                            </div>`

            chatboxMessageWrapper.insertAdjacentHTML('beforeend', message)
            chatboxForm.style.alignItems = 'center'
            textarea.rows = 1
            textarea.focus()
            textarea.value = ''
            scrollBottom()
        }

        function autoReply1() {
            const today = new Date()
            let message = `<div class="chatbox-message-item received">
                                <span class="chatbox-message-item-text">
                                    ok thx
                                </span>
                                <span class="chatbox-message-item-time">${addZero(today.getHours())}:${addZero(today.getMinutes())}</span>
                            </div>`
            chatboxMessageWrapper.insertAdjacentHTML('beforeend', message)
            scrollBottom()
        }

        function autoReply2() {
            const today = new Date()
            let message = `<div class="chatbox-message-item received">
                                <span class="chatbox-message-item-text">
                                    You're welcome, thank you!
                                </span>
                                <span class="chatbox-message-item-time">${addZero(today.getHours())}:${addZero(today.getMinutes())}</span>
                            </div>`
            chatboxMessageWrapper.insertAdjacentHTML('beforeend', message)
            scrollBottom()
        }

        function scrollBottom() {
            chatboxMessageWrapper.scrollTo(0, chatboxMessageWrapper.scrollHeight)
        }

        function isValid(value) {
            let text = value.replace(/\n/g, '')
            text = text.replace(/\s/g, '')

            return text.length > 0
        }
    })

    return (
        <>
            <div className="chatbox-wrapper">
                <button className='chatbox-toggle' onClick={showChatbox}><i className="fa-solid fa-message"></i></button>
                <div className="chatbox-message-wrapper">
                    <div className="chatbox-message-header">
                        <div className="chatbox-message-profile">
                            <img  src={process.env.PUBLIC_URL + '/img/emoji1.png'}  className="chatbox-message-image" />
                            <div>
                                <h4 className="chatbox-message-name">Hin gor (航空榮譽學士)</h4>
                                <p className="chatbox-message-status">online</p>
                            </div>
                        </div>
                    </div>
                    <div className="chatbox-message-content">
                        <div className="chatbox-message-item received">
                            <span className="chatbox-message-item-text">
                                Hello, where are you? How about my food?
                            </span>
                            <span className="chatbox-message-item-time">08:30</span>
                        </div>
                    </div>
                    <div className="chatbox-message-bottom">
                        <form action="#" className="chatbox-message-form">
                            <textarea rows="1" placeholder="Type message..." className="chatbox-message-input"></textarea>
                            <button type="submit" className="chatbox-message-submit"><i className="fa-solid fa-paper-plane"></i></button>
                        </form>
                    </div>
                </div>
            </div>
        </>
    )
}

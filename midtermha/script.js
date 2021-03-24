const access_key = '21dae06e88c5d309d8e19781685368b4'

const results = document.getElementById('results')
const form = document.getElementById('form')
const input = document.getElementById('input')
const heading = document.getElementById('heading')

const request = async (url, method = 'GET', body = null, headers = {}) => {
    try {
        if (body) {
            body = JSON.stringify(body)
            headers["Content-Type"] = "application/json"
        }

        const response = await fetch(url, { method, body, headers })
        const data = await response.json()

        return data
    } catch (e) {}
}

const detectLanguage = async (value) => {
    let url = `https://ws.detectlanguage.com/0.2/detect`

    results.innerHTML = '<div class="loading"></div>'

    const fetched = request(url, 'POST', { q: value }, {
        Authorization: `Bearer ${access_key}`
    })

    fetched.then(result => {
        const detections = result.data.detections

        results.innerHTML = ''
        detections.map(({ language, confidence, isReliable }) => {
            const detection = document.createElement('div')
            detection.classList.add('item')

            detection.innerHTML = `
                <span><b>Language: </b> ${ language.toUpperCase() }</span> <br>
                <span><b>Confidence level: </b> ${ confidence }</span> <br>
                <span><b>Reliability: </b> ${ isReliable === true ? 'Higher' : isReliable === false ? 'Lower' : '' }</span>
            `

            results.appendChild(detection)
        })
    })
}

form.addEventListener('submit', (e) => {
    e.preventDefault()

    let value = input.value
    if (value != '' && value != ' ') {
        detectLanguage(value)
    }
})
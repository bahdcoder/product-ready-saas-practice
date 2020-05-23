import app from '@/server'
import Config from '@/config'

app.listen(Config.port, () => {
    console.log('running on port', Config.port)
})

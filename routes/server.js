//
// Copyright (c) 2019 Autodesk, Inc.
//
// Permission is hereby granted, free of charge, to any person obtaining a copy
// of this software and associated documentation files (the "Software"), to deal
// in the Software without restriction, including without limitation the rights
// to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
// copies of the Software, and to permit persons to whom the Software is
// furnished to do so, subject to the following conditions:
//
// The above copyright notice and this permission notice shall be included in all
// copies or substantial portions of the Software.
//
// THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
// IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
// FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
// AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
// LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
// OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
// SOFTWARE.
//

/*jshint esversion: 8 */

const _path = require('path');
const express = require('express');
const cookieSession = require('cookie-session');
const config = require('../config');
if (!config.credentials.client_id || !config.credentials.client_secret)
	return (console.error('Missing FORGE_CLIENT_ID or FORGE_CLIENT_SECRET env variables.'));

let app = express();
app.use(express.static(_path.join(__dirname, '../public')));
app.use(cookieSession({
	name: 'forge_session',
	keys: ['forge_secure_key'],
	maxAge: 60 * 60 * 1000 // 1 hour, same as the 2 legged lifespan token
}));
app.use(express.json({
	limit: '50mb'
}));
app.use('/api/forge', require('./oauth'));
app.use('/api', require('./controllers/DesignAutomationController'));

app.set('port', process.env.PORT || 3000);

module.exports = app;
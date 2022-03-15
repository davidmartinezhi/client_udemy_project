import React, {useState} from 'react';
import { Form, Button, Input, Select, Row, Col, notification} from "antd";
import {signUpAdminApi} from "../../../../api/user";
import {getAccessTokenApi} from "../../../../api/auth";

import "./AddUserForm.scss";

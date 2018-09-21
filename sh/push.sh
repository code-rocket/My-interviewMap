#!/usr/bin/python
# -*- coding: utf-8 -*-

from sys import stdin, stdout, stderr

import paramiko
import utils
import time

def do(host_name,ssh_port,root_name,root_pwd,do_path,log_path,local_path,file_name,is_install_docker,daemon_file,is_init,open_port):

###定义变量
  host_name='192.168.1.31'
  ssh_port='22'
  root_name='root'
  root_pwd='newsee888'
  local_path='/Applications/XAMPP/htdocs/caeser/SASS-frontend/dist/index.html'

do_path='/home/www/web'
remote_path=do_path

###连接服务器
ssh_client=paramiko.SSHClient()
ssh_client.set_missing_host_key_policy(paramiko.AutoAddPolicy())
ssh_client.connect(host_name,ssh_port,root_name,root_pwd)
utils.output( host_name + '- 服务器连接成功!! ')

###进入目标文件目录
cmd='cd ' + do_path + ';'
stdin,stdout,stderr=ssh_client.exec_command(cmd,get_pty=True)
utils.readline(stdout)

###删除相关文件（旧文件） index.html / static  文件
cmd1='rm -rf index.html;'
cmd2='rm -rf /static;'
stdin,stdout,stderr=ssh_client.exec_command(cmd1,get_pty=True)
stdin,stdout,stderr=ssh_client.exec_command(cmd2,get_pty=True)

###上传
utils.remoteftp(host_name,ssh_port,root_name,root_pwd,local_path,remote_path)

###解压文件
cmd='tar  -pzxvf  ' + do_path + file_name + ' -C ' + do_path + ';'
utils.output('begin exec:' + cmd)
stdin,stdout,stderr=ssh_client.exec_command(cmd,get_pty=True)
# utils.readline(stdout)
utils.output('文件解压完成!')










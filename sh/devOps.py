# -*- coding: utf-8 -*-

from sys import stdin, stdout, stderr

import paramiko
import utils
import time

def do(host_name,ssh_port,root_name,root_pwd,do_path,log_path,local_path,file_name,is_install_docker,daemon_file,is_init,open_port):

    ###连接服务器
    ssh_client = paramiko.SSHClient()
    ssh_client.set_missing_host_key_policy(paramiko.AutoAddPolicy())
    ssh_client.connect(host_name,ssh_port,root_name,root_pwd)
    utils.output( host_name + '-服务器连接成功')

    #连接完成开始执行指令
    cmd = 'mkdir -p ' + do_path + ';'
    stdin,stdout,stderr=ssh_client.exec_command(cmd,get_pty=True)
    utils.output('远程主机ssh登录 创建newsee 数据目录 完成!' + do_path)
    time.sleep(2)
    #创建日志目录
    cmd = 'mkdir -p ' + log_path + ';'
    stdin,stdout,stderr=ssh_client.exec_command(cmd,get_pty=True)
    utils.output('远程主机ssh登录 创建newsee 日志目录 完成!')
    time.sleep(2)
    #设置日志目录访问权限
    cmd = 'chmod -R 777 ' + log_path + ';'
    stdin,stdout,stderr=ssh_client.exec_command(cmd,get_pty=True)
    utils.output('远程主机ssh登录 设置newsee 日志目录权限 完成!')
    time.sleep(2)
    utils.readline(stdout)
    utils.output('远程主机ssh登录 创建newsee 目录 完成!')

    #传输文件
    remote_path=do_path + file_name
    utils.remoteftp(host_name,ssh_port,root_name,root_pwd,local_path,remote_path)

    #进入文件目录
    cmd='cd ' + do_path + ';'
    stdin,stdout,stderr=ssh_client.exec_command(cmd,get_pty=True)
    utils.readline(stdout)

    if is_install_docker > 0:
        #SET UP THE REPOSITORY
        cmd='yum install -y yum-utils device-mapper-persistent-data lvm2; \
            yum-config-manager  --add-repo  https://download.docker.com/linux/centos/docker-ce.repo;  \
            yum-config-manager --enable docker-ce-edge;'
        stdin,stdout,stderr=ssh_client.exec_command(cmd,get_pty=True)
        utils.readline(stdout)
        utils.output('Docker 安装预设置完成')
        #开始安装docker
        cmd='yum makecache fast; \
            yum install docker-ce -y;'
        stdin,stdout,stderr=ssh_client.exec_command(cmd,get_pty=True)
        utils.readline(stdout)

        utils.output('Docker 安装完成')
        #设置docker镜像加速
        if daemon_file != '':
            #启用docker
            utils.remoteftp(host_name,ssh_port,root_name,root_pwd,daemon_file,'/etc/docker/daemon.json')
            utils.output('Docker 镜像加速设置完成')
    if is_init > 0:
        #启用docker
        cmd='systemctl start docker;'
        stdin,stdout,stderr=ssh_client.exec_command(cmd,get_pty=True)
        utils.readline(stdout)
        utils.output('启用docker 完成!')

        #设置开机启用docker
        cmd='systemctl enable docker;'
        stdin,stdout,stderr=ssh_client.exec_command(cmd,get_pty=True)
        utils.readline(stdout)
        utils.output('设置开机启用docker 完成!')

    #docker 删除现有容器
    cmd='docker rm -f  ' + file_name
    stdin,stdout,stderr=ssh_client.exec_command(cmd,get_pty=True)
    utils.readline(stdout)
    utils.output('docker容器 删除完成!')

    time.sleep(2)

    cmd= 'cd ' + do_path + ';' + 'ls;'
    utils.output(cmd)
    stdin,stdout,stderr=ssh_client.exec_command(cmd,get_pty=True)
    utils.readline(stdout)

    #docker 运行容器
    cmd='sudo docker run -d  --net=host -v ' + do_path + ':/app  -v ' + log_path + ':/logs    --name ' + file_name + '  -v /etc/localtime:/etc/localtime  --restart=always  java:8 java  -jar /app/' + file_name + ';'
    #cmd='sudo docker run -d  --net=host -v $PWD:/app --name ' + file_name + '  -v /etc/localtime:/etc/localtime  --restart=always  java:8 java -jar /app/' + file_name + ';'

    #cmd='docker run -d  --net=host -v $PWD:/app --name ' + file_name + '  java:8 java -jar /app/' + file_name + ';'
    utils.output(cmd)
    stdin,stdout,stderr=ssh_client.exec_command(cmd,get_pty=True)
    utils.readline(stdout)
    utils.output('docker容器 设置运行 完成!')

    #查看docker 运行状态
    cmd='docker ps ;'
    stdin,stdout,stderr=ssh_client.exec_command(cmd,get_pty=True)
    utils.readline(stdout)

    if open_port > 0:
        #启用docker
        cmd='firewall-cmd --zone=public --add-port=' + str(open_port) + '/tcp --permanent;firewall-cmd --reload;'
        stdin,stdout,stderr=ssh_client.exec_command(cmd,get_pty=True)
        utils.readline(stdout)
        utils.output('防火墙端口设置 完成!')

def doFront(host_name,ssh_port,root_name,root_pwd,do_path,local_path,file_name):

    ###连接服务器
    ssh_client = paramiko.SSHClient()
    ssh_client.set_missing_host_key_policy(paramiko.AutoAddPolicy())
    ssh_client.connect(host_name,ssh_port,root_name,root_pwd)
    utils.output( host_name + '-服务器连接成功')

    #连接完成开始执行指令
    cmd = 'mkdir -p ' + do_path + ';'
    stdin,stdout,stderr=ssh_client.exec_command(cmd,get_pty=True)

    utils.readline(stdout)
    utils.output('远程主机ssh登录 创建newsee 目录 完成!')

    #进入文件目录
    cmd='cd ' + do_path + ';'
    stdin,stdout,stderr=ssh_client.exec_command(cmd,get_pty=True)
    utils.readline(stdout)

    #进入文件目录
    cmd='rm -rf  ' + file_name + ';'
    stdin,stdout,stderr=ssh_client.exec_command(cmd,get_pty=True)
    # utils.readline(stdout)
    utils.output('删除历史 tar 文件!')

    #传输文件
    remote_path=do_path + file_name
    utils.remoteftp(host_name,ssh_port,root_name,root_pwd,local_path,remote_path)

    #进入文件目录
    cmd='cd ' + do_path + ';ls;'
    stdin,stdout,stderr=ssh_client.exec_command(cmd,get_pty=True)
    utils.readline(stdout)
    utils.output('enter menu:' + cmd)

    #删除static 和 index.html文件或者文件夹 add by xiaosisi on 2017/11/06 === start
    cmd='rm -rf static;'
    stdin,stdout,stderr=ssh_client.exec_command(cmd,get_pty=True)
    utils.readline(stdout)
    utils.output('enter menu:' + cmd)
    cmd='rm -rf index.html;'
    stdin,stdout,stderr=ssh_client.exec_command(cmd,get_pty=True)
    utils.readline(stdout)
    utils.output('enter menu:' + cmd)
    #删除static 和 index.html文件或者文件夹 add by xiaosisi on 2017/11/06 === end

    #解压文件
    cmd='tar  -pzxvf  ' + do_path + file_name + ' -C ' + do_path + ';'
    utils.output('begin exec:' + cmd)
    stdin,stdout,stderr=ssh_client.exec_command(cmd,get_pty=True)
    # utils.readline(stdout)
    utils.output('文件解压完成!')






tar zxvf ./disttest/dist.tar.gz ./disttest

tar zxvf dist.tar.gz
mv ./dist/static ./static
mv ./dist/index.html ./
rm -rf ./dist

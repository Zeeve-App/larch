## Create the service file on Systemd
- `$ cd /etc/systemd/system/`
- `$ nano larch.service`

## File location: /etc/systemd/system/larch.service
```
[Unit]
Description=Larch Service

[Service]
Type=simple
ExecStart=$(GIVE THE LOCATION OF LARCH BINARY FILE)
Restart=always
Environment=NODE_ENV=development

[Install]
WantedBy=multi-user.target

```
## Enable the service

### Enable the service on boot
- `$ systemctl enable larch.service`

### Start the service
- `$ systemctl start larch.service`
- `$ systemctl restart larch.service`
- `$ systemctl status larch.service`

### Verify it is running
- `$ journalctl -u larch.service`

### Reload all services if you make changes to the service
- `$ systemctl daemon-reload`
- `$ systemctl restart larch.service`
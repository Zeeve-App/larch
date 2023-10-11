/* eslint-disable import/prefer-default-export */
export const getNodeExporterYaml = (namespace: string) => `
apiVersion: v1
kind: Pod
metadata:
  name: node_exporter
  namespace: ${namespace}
  labels:
    app.kubernetes.io/name: ${namespace}
    app.kubernetes.io/instance: node_exporter
    zombie-role: node_exporter
    app: zombienet
    zombie-ns: ${namespace}
spec:
  hostname: node-exporter
  containers:
    - image: docker.io/prom/node-exporter
      name: node_exporter
      ports:
        - containerPort: 9100
          name: prometheus_endpoint
      volumeMounts:
        - name: prom-cfg
          mountPath: /host/proc
          readOnly: true
        - name: prom-data
          mountPath: /host/sys
          readOnly: true
        - name: prom-root
          mountPath: /rootfs
          readOnly: true
  restartPolicy: OnFailure
  volumes:
    - name: prom-cfg
      hostPath:
        type: Directory
        path: /proc
    - name: prom-data
      hostPath:
        type: Directory
        path: /sys
    - name: prom-root
      hostPath:
        type: Directory
        path: /`;

node {
	stage 'Checkout Repo'
	git changelog: false, url: 'https://github.com/renansdias/hello-c'
	
	stage 'Build Docker Image'
	def hash = sh(script: 'git rev-parse HEAD | cut -c1-6 | tr -d \'\n\'', returnStdout: true)
	env.HASH = "${hash}"
	
	sh('docker build -t renansdias/hello-c:${HASH} .')
	
	stage 'Push Docker Image'
	sh('docker push renansdias/hello-c:${HASH}')
	
	stage 'Deploy to Kubernetes'
	sh('sed -i \'s/__VERSION__/\'${HASH}\'/g\' deployment-c.json')
	
	sh('kubectl apply -f deployment-c.json --context="aws_k8s" --kubeconfig="/var/lib/jenkins/.kube/config"')

	def serviceName = sh(script: 'kubectl get svc service-c -o name --context="aws_k8s" --kubeconfig="/var/lib/jenkins/.kube/config" | tr -d \'\n\r\'', returnStdout: true)
	
	if (serviceName != 'service/service-c') {
		sh('kubectl apply -f service-c.json --context="aws_k8s" --kubeconfig="/var/lib/jenkins/.kube/config"')
	}
}
#pragma strict

var cameraTransform : Transform;

function Start()
{
	cameraTransform = GameObject.FindGameObjectWithTag("MainCamera").GetComponent(Transform);
}

function Update()
{
	transform.rotation.eulerAngles.y = cameraTransform.rotation.eulerAngles.y;
}
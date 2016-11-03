#pragma strict

var camCollision : LayerMask;

private var playerTransform : Transform;
private var playerHeight : Vector3;

private var xRot : float;
private var yRot : float;
private var xCamSpeed : float;
private var yCamSpeed : float;
private var yLimitMin : float;
private var yLimitMax : float;
private var camDistance : float;

function Start()
{
	playerTransform = GameObject.Find("Player").GetComponent(Transform);
	playerHeight = Vector3(0, GlobalInfo.Instance().playerHeight, 0);
	
	xRot = playerTransform.rotation.eulerAngles.x;
	yRot = playerTransform.rotation.eulerAngles.y;
	yLimitMin = -50.0f;
	yLimitMax =  15.0f;
	
}

function LateUpdate()
{
	if (!GlobalInfo.Instance().inWorld) return;
	
	// Settings
	xCamSpeed = CameraSettings.Instance().xCamSpeed;
	yCamSpeed = CameraSettings.Instance().yCamSpeed;
	camDistance = CameraSettings.Instance().camDistance;
	
	// Free Movement
	var mouseX = Input.GetAxis("Mouse X");
	var mouseY = Input.GetAxis("Mouse Y");
	
	xRot += mouseX*xCamSpeed;
	yRot += mouseY*yCamSpeed;
	
	yRot = Mathf.Clamp(yRot, yLimitMin, yLimitMax);
	
	var rotation : Quaternion = Quaternion.Euler(-yRot, xRot, 0);
	var position : Vector3 = (playerTransform.position+playerHeight) - rotation*Vector3.forward*camDistance;
	
	var finalPosition : Vector3 = position + 0.09f*((playerTransform.position+playerHeight)-position);
	var finalRotation : Quaternion = rotation;
	
	var hitInfo : RaycastHit;
	if (Physics.Linecast(playerTransform.position, position, hitInfo, camCollision))
	{
		finalPosition = hitInfo.point + 0.1f*((playerTransform.position+playerHeight)-position);
	}
	
	transform.position = finalPosition;
	transform.rotation = finalRotation;
}

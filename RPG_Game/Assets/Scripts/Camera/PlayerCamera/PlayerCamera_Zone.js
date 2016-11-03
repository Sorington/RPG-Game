#pragma strict

private var playerTransform : Transform;

private var relativeCamPos : Vector3;
private var relativeLookPos : Vector3;

function Start()
{
	playerTransform = GameObject.Find("Player").GetComponent(Transform);
	
	relativeCamPos = Vector3.forward;
	relativeLookPos = Vector3.zero;
	
}

function LateUpdate()
{
	if (!GlobalInfo.Instance().inZone) return;
	
	// Settings
	relativeCamPos = CameraSettings.Instance().relativeCamPos;
	relativeLookPos = CameraSettings.Instance().relativeLookPos;
	
	// Positioning
	var rotation : Quaternion = Quaternion.LookRotation(relativeLookPos-relativeCamPos);
	var position : Vector3 = playerTransform.position+relativeCamPos;
	
	var finalPosition : Vector3 = Vector3.Lerp(transform.position, position, 0.04);
	var finalRotation : Quaternion = Quaternion.Lerp(transform.rotation, rotation, 0.04);
	
	transform.position = finalPosition;
	transform.rotation = finalRotation;
}

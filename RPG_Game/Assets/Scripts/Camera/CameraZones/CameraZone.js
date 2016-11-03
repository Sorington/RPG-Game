#pragma strict

var relativeCamPos : Vector3;
var relativeLookPos : Vector3;
var free : boolean = false;

function OnTriggerEnter(hit : Collider)
{
	if (hit.tag == "Player")
	{
		CameraSettings.Instance().relativeCamPos = relativeCamPos;
		CameraSettings.Instance().relativeLookPos = relativeLookPos;
		if (!free) GlobalInfo.Instance().SetZone();
		else GlobalInfo.Instance().SetWorld();
	}
}